import { FC, useEffect, useState } from "react";
import styles from "./Subscription.scss?inline";
import { Store, Action } from '@ngrx/store';


export interface ISubscriptionProps {
  username: string;
  shouldDisplayMentions?: boolean;
}


export const Subscription: FC<ISubscriptionProps> = ({
  username,
  shouldDisplayMentions,
}: ISubscriptionProps) => {
  
  const [count, setCount] = useState<number>(0);
  

  const store = (window as any).ngrxStore as Store<any>;  // Access the global store context

  const ngrxActions = (window as any).actions as Action<any>;

  useEffect(() => {
    if (!store) {
      console.error('NgRx store is not available');
      return;
    }

    // Subscribe to store changes
    const subscription = store.select('counter').subscribe((counterState: any) => {
      setCount(counterState.count);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [store]);

    // Dispatch increment action
    const handleIncrement = () => {
      console.log("actionsactions", ngrxActions)
      store.dispatch(ngrxActions.increment());
    };
  
    // Dispatch decrement action
    const handleDecrement = () => {
      store.dispatch(ngrxActions.decrement());
    };
  

  return (
    <>
      <style>{styles}</style>
      <div className="subscription">
        <h2>Counter Data in web component: {count}</h2>

        

        <button onClick={handleIncrement}>Increment by web component</button>
        <button onClick={handleDecrement}>Decrement by web component</button>

        <h2 className="subscription__title">Subscription</h2>
        <p className="subscription__greeting">Hello {username}!</p>

        <label htmlFor="email">
          <input
            id="email"
            type="email"
            className="subscription__input"
            placeholder="Enter your email"
          />
        </label>

        {shouldDisplayMentions && (
          <p className="subscription__mentions">
            My mention should be display here...
          </p>
        )}
      </div>
    </>
  );
};
