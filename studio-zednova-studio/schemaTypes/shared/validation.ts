type CustomRule<Value, R> = {
  custom(fn: (value: Value | undefined) => true | string): R;
};

/** Allow blank optional URLs; validate http/https when present. */
export function optionalUrl<R>(rule: CustomRule<string, R>): R {
  return rule.custom((value) => {
    if (!value || !String(value).trim()) return true;
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) || "Must be a valid http or https URL";
    } catch {
      return "Must be a valid URL";
    }
  });
}

/** Allow blank optional emails; validate format when present. */
export function optionalEmail<R>(rule: CustomRule<string, R>): R {
  return rule.custom((value) => {
    if (!value || !String(value).trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Must be a valid email address";
  });
}

/** Validate profile/social URL lists; ignore empty rows. */
export function optionalUrlList<R>(rule: CustomRule<string[], R>): R {
  return rule.custom((values) => {
    if (!values?.length) return true;
    for (const value of values) {
      if (!value || !String(value).trim()) {
        return "Remove empty rows or enter a full URL for each profile link";
      }
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "Each profile link must use http or https";
        }
      } catch {
        return `"${value}" is not a valid URL`;
      }
    }
    return true;
  });
}
