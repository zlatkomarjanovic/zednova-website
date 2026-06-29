/** Typed conversion events for Vercel Analytics (consent-gated). */
export type AnalyticsEvent =
  | "cta_click"
  | "form_submit"
  | "form_error"
  | "calendar_click"
  | "calendar_booked"
  | "service_card_click"
  | "outbound_link_click"
  | "start_chooser_complete";

export type AnalyticsEventProps = {
  cta_click: { label: string; href: string; location?: string };
  form_submit: { form: string; service?: string; industry?: string };
  form_error: { form: string; message?: string };
  calendar_click: { source: string; calLink?: string };
  calendar_booked: { source: string; calLink?: string };
  service_card_click: { service: string; href: string; location?: string };
  outbound_link_click: { href: string; label?: string; location?: string };
  start_chooser_complete: {
    goal: string;
    industry: string;
    services: string;
  };
};

export type TrackProps<E extends AnalyticsEvent> = AnalyticsEventProps[E];
