import { useAuth } from "~src/hooks/useAuth"
import TableIcon from "react:~assets/list_icon.svg"
import React from "react";
import { apiService } from "~src/services/api";

export function SpreadsheetsButton() {
  const { token, loading } = useAuth()
  const [hasAccess, setHasAccess] = React.useState(true);

  React.useEffect(() => {
    const checkAccess = async () => {
      if (!token) return;

      try {
        const subscriptionData = await apiService.checkSubscription(token)

        const hasValidPlan =
            subscriptionData.plan !== undefined &&
            subscriptionData.plan !== "free_trial"

        setHasAccess(hasValidPlan)
      } catch (error) {
        console.error("Failed to check subscription", error)
      }
    }

    checkAccess()
  }, [token])

  if (!hasAccess || loading) {
    return null
  }

  const handleClick = () => {
    window.postMessage(
      {
        source: "quicksend",
        type: "OPEN_SHEETS_MODAL"
      },
      "*"
    )
  }

  return (
    <button
        className="table-button"
        onClick={handleClick}
        title="Parse recipients from Google Sheets">
      <TableIcon width={24} height={24} />
    </button>
  )
}