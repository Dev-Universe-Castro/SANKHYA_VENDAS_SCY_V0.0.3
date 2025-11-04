import { useState } from 'react';
import { CompanyForm } from '../company-form';
import { Button } from '@/components/ui/button';

export default function CompanyFormExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Form</Button>
      <CompanyForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log('Form data:', data);
          setOpen(false);
        }}
      />
    </div>
  );
}
