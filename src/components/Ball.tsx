import { JSX } from "solid-js/jsx-runtime";
import style from "./Ball.module.css";

export type Props = {
  children: JSX.Element;
}

export default function (props: Props) {
  return (
    <figure class={style.sphere}>{props.children}</figure>
  );
};
