module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags "ActionCable", "User #{current_user.id}"
    end

    private

    def find_verified_user
      Rails.logger.info "+++++++++++++++++++++++++"
      Rails.logger.info env['warden'].user(:user)
      Rails.logger.info "+++++++++++++++++++++++++"
      
      if current_user = env['warden'].user(:user)
        current_user
      else
        reject_unauthorized_connection
      end
    end
    
  end
end
