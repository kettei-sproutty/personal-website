

import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { RESEND_API } from '$env/static/private';
import { z } from "zod";
import { Resend } from 'resend';

const resend = new Resend(RESEND_API);

const contactMeSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  subject: z.string().min(3).max(255),
  message: z.string().min(10).max(5000),
});

export const actions: Actions = {
  "send-email": async (event) => {
    const formData = await event.request.formData();
    const data = Object.fromEntries(formData.entries());

    const contactMe = contactMeSchema.safeParse(data);

    if (!contactMe.success) {
      const issues = contactMe.error.issues.reduce<Record<string, string>>((acc, issue) => {
        acc[issue.path.join('.')] = issue.message;
        return acc;
      }, {});

      return fail(400, { issues });
    }

    const html = `<span>Email from: ${contactMe.data.name} (${contactMe.data.email})</span>
      <br>
      <span>Subject: ${contactMe.data.subject}</span>
      <br>
      <span>Message: ${contactMe.data.message}</span>`;

    const { error } = await resend.emails.send({
      from: 'contact-me@alessiomarchi.dev',
      to: ['alessiomarchi.dev@gmail.com'],
      subject: contactMe.data.subject,
      html
    });

    if (error) {
      console.error(error);
      return fail(500, { issues: { api: "Error while sending e-mail." } });
    }

    return { success: true }
  }
};

