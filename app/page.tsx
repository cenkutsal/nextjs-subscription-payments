'use client';

import React, { useRef } from 'react';
import { Deposit, supabase } from '@/lib/supabase';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DepositForm } from '@/components/DepositForm';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DepositForm />
    </div>
  );
}
