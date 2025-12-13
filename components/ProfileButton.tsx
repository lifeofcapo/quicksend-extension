import { useAuth } from "~shared/hooks/useAuth"
import ReactComponent from "react:~assets/profile_icon.svg"
import { API_CONF } from "~shared/utils/constants";
import React from "react";

interface ProfileButtonProps {
    onClick: () => Promise<void>;
}

export function ProfileButton({onClick}: ProfileButtonProps) {
  const { token, loading } = useAuth()

  const handleClick = async () => {
    if (loading) {
      return
    }

    const redirectUrl = token
      ? `${API_CONF.BASE_URL}/${API_CONF.ENDPOINTS.PROFILE}`
      : `${API_CONF.BASE_URL}/${API_CONF.ENDPOINTS.LOGIN}`

    window.open(redirectUrl, "_blank")
  }

  return (
    <button
      className="profile-button"
      onClick={handleClick}
      disabled={loading}
      title={loading ? "Loading..." : token ? "Go to your profile" : "Login"}
    >
      <ReactComponent
        width={24}
        height={24}
      />
    </button>
  )
}
