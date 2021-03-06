class Commands
  USERNAME = { wherebot: 'Wherebot' }
  RESPONSE_TYPE =  { private: "ephemeral" }

  def initialize(args)
    @body = args[:text]
    @username = args[:user_name]
    @token = args[:token]
    @command = args[:command]
  end

  def response
    if authentic?
      {
        response_type: response_type, username: USERNAME[:wherebot]
      }.merge(response_body)
    else
      { failure: "Could not authenticate." }
    end
  end

  def response_type
    RESPONSE_TYPE[:private]
  end

  def command
    raise NoMethodError, "Subclass must declare its command"
  end

  def response_body
    raise NoMethodError, "Subclass must declare its response body"
  end

  private

  def authentic?
    return false unless @token

    ActiveSupport::SecurityUtils.secure_compare(
      @token, ENV["MATTERMOST_TOKEN_#{command.upcase}"]
    )
  end
end

class Commands::WhereIs < Commands
  def command
    "WhereIs"
  end

  def response_body
    if target_user.nil?
      {
        text: %(I couldn't find "#{target_username}".  Try typing their Mattermost name.)
      }
    elsif target_user.last_whereabouts.present?
      time = target_user.last_whereabouts.sent_at
      msg = "At #{time.strftime('%-l:%M%P')} on #{time.strftime('%m/%d/%y')}, #{target_user.name} sent \"#{target_user.last_whereabouts.body}\""
      {
        attachments: [{
          fallback: msg,
          title: "#{time.strftime('%-l:%M%P')}, #{time.strftime('%m/%d/%y')}:",
          author_name: target_user.name,
          text: target_user.last_whereabouts.body,
          color: "#008800"
        }]
      }
    else
      { text: "#{target_user.name} hasn't set a where recently." }
    end
  end

  def target_user
    @user ||= User.find_by(email: "#{target_username}@eff.org")
  end

  private

  def target_username
    @body.split(' ').first.remove("@")
  end
end

class Commands::SetMyWhere < Commands
  def target_user
    username = @username.remove("@")
    @user ||= User.find_by(email: "#{username}@eff.org")
  end

  def command
    "Where"
  end

  def response_body
    { text: message }
  end

  def message
    if target_user.present? && create_where
      %(Your whereabouts are now set to "#{@body}".)
    else
      "I couldn't save your message. Better send it it to where@eff.org :sweat_smile:"
    end
  end

  private

  def create_where
    target_user.where_messages.create(
      provenance: WhereMessage::PROVENANCES[:mattermost],
      body: @body,
      sent_at: DateTime.now
    ).persisted?
  end
end
