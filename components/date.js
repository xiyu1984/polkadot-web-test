import { parseISO, format } from 'date-fns';
import React from "react";

export default function Date({ dateString }) {
  // const [hydrated, setHydrated] = React.useState(false);

  // React.useEffect(() => {
  //     setHydrated(true);
  // }, []);

  // if (!hydrated) {
  //     // Returns null on first render, so the client and server match
  //     return null;
  // }
  
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
