const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendStaffInvitationEmail = async ({
  email,
  businessName,
  invitationUrl,
  expiresAt
}) => {
  const { data, error } = await resend.emails.send({
    from: 'OccuSync <onboarding@resend.dev>',
    to: [email],
    subject: `You've been invited to join ${businessName} on OccuSync`,
    html: `
      <h2>You're invited to join ${businessName}</h2>

      <p>
        You have been invited to join
        <strong>${businessName}</strong>
        as a staff member on OccuSync.
      </p>

      <p>
        Click the button below to create your staff account:
      </p>

      <p>
        <a
          href="${invitationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Accept Invitation
        </a>
      </p>

      <p>
        This invitation expires on
        <strong>${new Date(expiresAt).toLocaleString()}</strong>.
      </p>

      <p>
        If you did not expect this invitation, you can safely ignore this email.
      </p>
    `
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  sendStaffInvitationEmail
};