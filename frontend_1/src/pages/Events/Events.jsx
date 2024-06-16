import React, { useEffect, useState } from "react";

import { fetchEvents } from "../../api/events/apiEvents";

import PageConstructor from "../../components/PageContructor/PageConstructor";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <PageConstructor
      data={events}
      isLoading={isLoading}
      extension_path="eventsDescription"
      subtitle="Опис проведених подій"
      mainTitle="Що ми організували"
    />
  );
};
export default Events;
