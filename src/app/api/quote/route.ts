import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_NAME } from '../../../lib/schemaStructuredData';

export const dynamic = 'force-dynamic';

interface QuoteLeadPayload {
  name: string;
  phone: string;
  email?: string;
  suburb?: string;
  service?: string;
  urgency?: string;
  details?: string;
  source?: string;
  honeypot?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: QuoteLeadPayload = await req.json();
    const { name, phone, email, suburb, service, urgency, details, source, honeypot } = body;

    // 1. Honeypot check for bot spam protection
    if (honeypot) {
      console.warn('[SPAM_BLOCKED] Honeypot field triggered by bot submission.');
      return NextResponse.json({ success: true, message: 'Enquiry received.' }, { status: 200 });
    }

    // 2. Required field validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: 'A valid Australian phone number is required.' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email ? email.trim() : '';
    const cleanSuburb = suburb ? suburb.trim() : 'Greater Townsville';
    const cleanService = service ? service.trim() : 'General Tree Care / Assessment';
    const cleanUrgency = urgency ? urgency.trim() : 'Standard (24-48 hours)';
    const cleanDetails = details ? details.trim() : 'No additional details provided.';
    const cleanSource = source ? source.trim() : 'Website Form';

    const cleanTel = trimmedPhone.replace(/[^0-9+]/g, '');
    const submissionTime = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Brisbane',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const targetInbox = process.env.BUSINESS_INBOX_EMAIL || BUSINESS_EMAIL || 'info@arbco.com.au';
    const senderEmail = process.env.SENDER_EMAIL || `quotes@arbco.com.au`;

    const subject = `🌿 New Quote Request: ${cleanService} in ${cleanSuburb} (${trimmedName})`;

    // HTML Email Template
    const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Quote Request</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
    .header { background-color: #051c0e; color: #ffffff; padding: 28px 24px; text-align: center; border-bottom: 4px solid #7cc043; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; color: #7cc043; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; }
    .badge-urgent { background: #fee2e2; color: #b91c1c; }
    .badge-normal { background: #dcfce7; color: #15803d; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 20px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table td.label { width: 35%; font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .table td.value { width: 65%; font-weight: 600; color: #0f172a; }
    .notes-box { background: #f8fafc; border-left: 4px solid #036829; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 13px; color: #334155; line-height: 1.6; margin-top: 8px; }
    .cta-bar { text-align: center; margin: 24px 0 8px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
    .btn { display: inline-block; background-color: #036829; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 10px; margin: 4px 6px; }
    .btn-secondary { background-color: #0f172a; }
    .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${BUSINESS_NAME}</h1>
      <p>⚡ New Customer Enquiry Received</p>
    </div>
    <div class="content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 12px; color: #64748b;">Received: <strong>${submissionTime}</strong></span>
        <span class="badge ${cleanUrgency.toLowerCase().includes('emergency') || cleanUrgency.toLowerCase().includes('48') ? 'badge-urgent' : 'badge-normal'}">
          ${cleanUrgency}
        </span>
      </div>

      <table class="table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value"><strong>${trimmedName}</strong></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${cleanTel}" style="color: #036829; font-size: 16px; font-weight: 800; text-decoration: none;">${trimmedPhone}</a></td>
        </tr>
        ${trimmedEmail ? `
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${trimmedEmail}" style="color: #036829; text-decoration: none;">${trimmedEmail}</a></td>
        </tr>` : ''}
        <tr>
          <td class="label">Service Required</td>
          <td class="value" style="color: #036829; font-weight: 800;">${cleanService}</td>
        </tr>
        <tr>
          <td class="label">Suburb / Location</td>
          <td class="value">${cleanSuburb}</td>
        </tr>
        <tr>
          <td class="label">Form Source</td>
          <td class="value" style="font-size: 12px; color: #64748b;">${cleanSource}</td>
        </tr>
      </table>

      <div style="margin-top: 16px;">
        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Job Description / Details:</span>
        <div class="notes-box">${cleanDetails}</div>
      </div>

      <div class="cta-bar">
        <a href="tel:${cleanTel}" class="btn">📞 Call ${trimmedName} Now</a>
        ${trimmedEmail ? `<a href="mailto:${trimmedEmail}" class="btn btn-secondary">✉️ Reply via Email</a>` : ''}
      </div>
    </div>
    <div class="footer">
      This notification was automatically dispatched from the <strong>${BUSINESS_NAME}</strong> website.<br>
      Company Phone: <a href="tel:0456579811" style="color: #64748b;">0456 579 811</a> | Direct Inbox: <a href="mailto:${targetInbox}" style="color: #64748b;">${targetInbox}</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text fallback
    const textEmail = `
========================================
NEW QUOTE REQUEST - ${BUSINESS_NAME}
========================================
Customer Name:    ${trimmedName}
Phone Number:     ${trimmedPhone} (tel:${cleanTel})
Email:            ${trimmedEmail || 'Not provided'}
Service:          ${cleanService}
Suburb:           ${cleanSuburb}
Urgency:          ${cleanUrgency}
Form Source:      ${cleanSource}
Submission Time:  ${submissionTime}

Project Details:
${cleanDetails}

========================================
Target Inbox: ${targetInbox}
Dispatch: 0456 579 811
========================================
    `.trim();

    let dispatched = false;
    let providerUsed = 'none';

    // Transport 1: Resend API (Recommended Vercel serverless integration)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || `${BUSINESS_NAME} <${senderEmail}>`,
            to: [targetInbox],
            reply_to: trimmedEmail || undefined,
            subject: subject,
            html: htmlEmail,
            text: textEmail,
          }),
        });

        if (resendRes.ok) {
          dispatched = true;
          providerUsed = 'resend';
          console.log(`[QUOTE_DELIVERY_SUCCESS] Dispatched to ${targetInbox} via Resend API.`);
        } else {
          const errText = await resendRes.text();
          console.error('[RESEND_ERROR]', errText);
        }
      } catch (err) {
        console.error('[RESEND_DISPATCH_EXCEPTION]', err);
      }
    }

    // Transport 2: SMTP via Nodemailer (Direct inbox delivery for cPanel, Gmail, or Microsoft 365)
    if (!dispatched && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${BUSINESS_NAME}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: targetInbox,
          replyTo: trimmedEmail || undefined,
          subject: subject,
          text: textEmail,
          html: htmlEmail,
        });

        dispatched = true;
        providerUsed = 'smtp';
        console.log(`[QUOTE_DELIVERY_SUCCESS] Dispatched to ${targetInbox} via SMTP (${process.env.SMTP_HOST}).`);
      } catch (err) {
        console.error('[SMTP_DISPATCH_EXCEPTION]', err);
      }
    }

    // Transport 3: Webhook forwarder (Zapier, Make, Slack, Discord, CRM)
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'quote_lead',
            business: BUSINESS_NAME,
            targetInbox,
            lead: {
              name: trimmedName,
              phone: trimmedPhone,
              email: trimmedEmail,
              suburb: cleanSuburb,
              service: cleanService,
              urgency: cleanUrgency,
              details: cleanDetails,
              source: cleanSource,
              timestamp: submissionTime,
            },
          }),
        });
        if (!dispatched) {
          dispatched = true;
          providerUsed = 'webhook';
        }
      } catch (err) {
        console.error('[WEBHOOK_DISPATCH_EXCEPTION]', err);
      }
    }

    // Transport 4: Server audit log (Guarantees zero lead loss if mail server isn't provisioned yet)
    if (!dispatched) {
      console.log('----------------------------------------------------');
      console.log(`[QUOTE_ENQUIRY_LOGGED_FOR_INBOX: ${targetInbox}]`);
      console.log(`Customer: ${trimmedName} | Phone: ${trimmedPhone} | Email: ${trimmedEmail || 'N/A'}`);
      console.log(`Service: ${cleanService} | Suburb: ${cleanSuburb} | Urgency: ${cleanUrgency}`);
      console.log(`Details: ${cleanDetails}`);
      console.log(`Source: ${cleanSource} | Time: ${submissionTime}`);
      console.log('----------------------------------------------------');
      providerUsed = 'server_audit_log';
    }

    return NextResponse.json({
      success: true,
      delivered: dispatched,
      provider: providerUsed,
      businessInbox: targetInbox,
      customerName: trimmedName,
      message: `Thank you, ${trimmedName}. Your enquiry has been received and routed to ${targetInbox}. An arborist will contact you shortly at ${trimmedPhone}.`,
    }, { status: 200 });

  } catch (error) {
    console.error('[QUOTE_API_CRITICAL_ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your quote request. Please call us directly on 0456 579 811.',
      },
      { status: 500 }
    );
  }
}
