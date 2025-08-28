"use client";
import ContentManagement from '@/components/ContentManagement'

import React from 'react';

export default function Sidebar() {
  return (
    <div className="flex bg-gray-100">
      <div className="flex-1">
        <ContentManagement />
      </div>
    </div>
  );
}
