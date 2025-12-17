import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ThemeConfig {
  clockSize: number;
  accentColor: string;
  font: string;
  showSplitLine: boolean;
  glassMaterial?: string;
  tag?: string;
}