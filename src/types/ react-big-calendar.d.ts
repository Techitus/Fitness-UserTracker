declare module 'react-big-calendar' {
    import { ComponentType } from 'react';
    import { Moment } from 'moment';
  
    // Define the types for the props that Calendar expects
    interface CalendarProps {
      localizer: unknown; // Moment.js localizer, could be typed better if we want to be specific
      events: Array<{
        title: string;
        start: Date;
        end: Date;
      }>;
      startAccessor: string;
      endAccessor: string;
      style?: React.CSSProperties;
      views: string[];
      defaultView: string;
      components: unknown; // You can refine this further if needed
    }
  
    // The Calendar component
    export const Calendar: ComponentType<CalendarProps>;
  
    // The momentLocalizer function returns a localizer for React Big Calendar
    export function momentLocalizer(moment: Moment): unknown;
  }
  