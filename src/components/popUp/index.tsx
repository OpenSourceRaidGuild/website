import { useRef, useCallback, useEffect } from "react";
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  placeInView: {
    isDisplayed: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

function PopUp({ children, placeInView }: Props) {
  const { isDisplayed, setDisplay } = placeInView;
  const clickListenerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        clickListenerRef.current &&
        !clickListenerRef.current.contains(event.target as Node)
      ) {
        setDisplay(false);
      }
    },
    [setDisplay]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, [handleClickOutside]);

  return isDisplayed ? (
    <$PopUp ref={clickListenerRef}>
      <button type="button" onClick={() => setDisplay(false)}>
        X
      </button>
      {children}
    </$PopUp>
  ) : null;
}

export default PopUp;

const $PopUp = styled("div")`
  display: flex;
  flex-direction: column;
  place-items: flex-end;
  position: absolute;
  top: 15vh;
  button {
    border-radius: 50%;
    background: var(--gray-200);
    border: 4px solid var(--gray-200);
    height: 30px;
    text-align: center;
    margin-bottom: 5px;
  }
`;
