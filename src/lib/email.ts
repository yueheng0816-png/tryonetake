import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const ADMIN_EMAIL = "support@tryonetake.com";
const FROM_EMAIL = "OneTake <noreply@tryonetake.com>";

export function isEmailConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  return !!key && key.length > 0;
}

/** Notify the user about a refund */
export async function sendUserRefundEmail(params: {
  to: string;
  refundAmount: number; // cents
  successCount: number;
  totalCount: number;
  reason: string;
}) {
  if (!isEmailConfigured()) {
    console.warn("[OneTake] RESEND_API_KEY not configured — skipping user email");
    return;
  }

  const { to, refundAmount, successCount, totalCount, reason } = params;
  const amountDollars = (refundAmount / 100).toFixed(2);
  const isFullRefund = successCount === 0;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: isFullRefund
        ? "Your OneTake order has been refunded"
        : `OneTake: Partial refund for your order (${successCount}/${totalCount} photos ready)`,
      html: `
        <div style="max-width:480px;margin:0 auto;font-family:system-ui,sans-serif">
          <h2 style="color:#333">${isFullRefund ? "Order refunded" : "Partial refund issued"}</h2>
          <p>${reason}</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px 0;color:#666">Photos generated</td><td style="text-align:right"><strong>${successCount}/${totalCount}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">Amount refunded</td><td style="text-align:right"><strong>$${amountDollars}</strong></td></tr>
          </table>
          <p style="color:#666;font-size:14px">The refund will appear on your card within 5–10 business days.</p>
          ${!isFullRefund ? `<p style="color:#666;font-size:14px">Your ${successCount} successful photos are still available in your dashboard.</p>` : ""}
          <p style="color:#999;font-size:12px;margin-top:24px">Questions? Reply to this email or contact support@tryonetake.com</p>
        </div>
      `,
    });
    console.log(`[OneTake] Refund email sent to ${to} — $${amountDollars}`);
  } catch (error) {
    console.error("[OneTake] Failed to send user refund email:", error);
  }
}

/** Alert the admin — something needs human attention */
export async function sendAdminAlert(params: {
  orderId: string;
  userEmail: string;
  plan: string;
  diagnosis: string;
  errorSummary: string;
  refundAmount: number;
  successCount: number;
  totalCount: number;
}) {
  if (!isEmailConfigured()) {
    console.warn("[OneTake] RESEND_API_KEY not configured — skipping admin alert");
    return;
  }

  const { orderId, userEmail, plan, diagnosis, errorSummary, refundAmount, successCount, totalCount } = params;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[ALERT] OneTake order ${orderId.slice(0, 8)}… — ${successCount}/${totalCount} photos, $${(refundAmount / 100).toFixed(2)} refunded`,
      html: `
        <div style="max-width:480px;margin:0 auto;font-family:system-ui,sans-serif">
          <h2 style="color:#d32f2f">🚨 Order Needs Attention</h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px 0;color:#666">Order ID</td><td style="text-align:right"><code>${orderId}</code></td></tr>
            <tr><td style="padding:8px 0;color:#666">User Email</td><td style="text-align:right">${userEmail}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Plan</td><td style="text-align:right">${plan}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Photos</td><td style="text-align:right"><strong>${successCount}/${totalCount}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">Refunded</td><td style="text-align:right"><strong>$${(refundAmount / 100).toFixed(2)}</strong></td></tr>
          </table>
          <h3 style="color:#333">Diagnosis</h3>
          <p style="background:#fff3e0;padding:12px;border-radius:8px;font-size:14px">${diagnosis}</p>
          <h3 style="color:#333">Error Details</h3>
          <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:12px;overflow-x:auto">${errorSummary}</pre>
        </div>
      `,
    });
    console.log(`[OneTake] Admin alert sent for order ${orderId}`);
  } catch (error) {
    console.error("[OneTake] Failed to send admin alert:", error);
  }
}
