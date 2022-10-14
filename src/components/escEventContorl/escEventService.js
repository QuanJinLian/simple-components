export const escEventService = (() => {
  const eventStorage = new Map();
  let openEventIds = [];

  const getFilteringEventIds = key => {
    return openEventIds.filter(id => id !== key);
  };

  const addEvent = (key, fn) => {
    if (key && typeof fn === 'function') {
      eventStorage.set(key, fn);
    }
  };

  const deleteOpenId = key => {
    openEventIds = getFilteringEventIds(key);
  };

  const appendOpenId = key => {
    const openEventIds_new = getFilteringEventIds(key);
    openEventIds_new.push(key);
    openEventIds = openEventIds_new;
  };

  const deleteEvent = key => {
    eventStorage.delete(key);
    openEventIds = getFilteringEventIds(key);
  };

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openEventIds.length) {
      const lastKey = openEventIds[openEventIds.length - 1];
      const fn = eventStorage.get(lastKey);
      try {
        fn?.();
        const lastKey_afterFn = openEventIds[openEventIds.length - 1];
        if (lastKey === lastKey_afterFn) openEventIds.pop();
      } catch (e) {}
    }
  });

  return {
    addEvent,
    deleteEvent,
    appendOpenId,
    deleteOpenId,
  };
})();
