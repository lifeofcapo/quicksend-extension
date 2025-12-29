import React, { useState } from "react"
import { createPortal } from "react-dom"

interface SheetsModalWindowProps {
  onSubmit: (spreadsheetId: string, range: string) => Promise<void>
  onClose?: () => void
}

export const SheetsModalWindow = ({
  onSubmit,
  onClose
}: SheetsModalWindowProps) => {
  const [spreadsheetId, setSpreadsheetId] = useState("")
  const [sheetName, setSheetName] = useState("Sheet1")
  const [range, setRange] = useState("A2:A10")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fullRange = `'${sheetName}'!${range}`
    await onSubmit(spreadsheetId.trim(), fullRange)
  }
  console.log("🟢SheetsModalWindow rendering")

  const modalContent = (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.()
        }
      }}
    >
      <div 
        className="modal-container"
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "90%"
        }}
      >
        <h3 style={{ marginBottom: "20px", fontSize: "24px" }}>
          Enter Google Sheets Details
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Enter Spreadsheet ID"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "16px"
            }}
          />

          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Sheet name (e.g., Sheet1)"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              required
              style={{
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "16px",
                flex: 1
              }}
            />

            <input
              type="text"
              placeholder="Range (e.g., A2:A10)"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              required
              style={{
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "16px",
                flex: 1
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Submit
          </button>

          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
            ** A spreadsheet ID can be extracted from its URL. For example, the
            spreadsheet ID in the URL
            https://docs.google.com/spreadsheets/d/abc1234567/edit#gid=0 is
            <br />
            <strong>abc1234567</strong>.
          </p>
        </form>
      </div>
    </div>
  )

  // рендер в document.body обязательно
  return createPortal(modalContent, document.body)
}