import React from "react";
import { Helmet } from "react-helmet";

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: React.FC<WindowTitleProps> = ({ title }) =>
  !title ? null : <Helmet title={`${title} - Copy Deck`} />;
