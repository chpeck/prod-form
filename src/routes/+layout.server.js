import { AUTHORIZED_EMAILS } from '$env/static/private';

export const load = async (event) => {
  const session = await event.locals.getSession();
  const authorizedEmails = AUTHORIZED_EMAILS.split(',');

  if (session && authorizedEmails.includes(session.user.email)) {
    return {
      session,
    };
  }

  return {
    session,
    error: 'Not authorized. Please contact admin.'
  };
};

