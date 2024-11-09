export interface PopupData {
  x: number;
  y: number;
  src: string;
  alt: string;
  route: string;
}

export interface NavData {
  link: any;
  path: any;
}

export interface Thread {
  id: string;
  title: string;
  createBy: string | null;
  createAt: string;
}

export interface TitleProps {
  title: string;
  category: string;
  isSelected: boolean;
}

export interface ScaleTranslateData {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface CardData {
  id: string;
  category: string;
  title: string;
  pointOfInterest: number;
  backgroundColor: string;
  onClick?: () => void;
}
export interface ImageProps {
  id: string;
  isSelected: boolean;
  pointOfInterest?: number;
  backgroundColor?: string;
}
