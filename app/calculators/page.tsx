import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';
import { BmiCalculator, BmrCalculator, MacroCalculator } from '@/components/calculators';

export const metadata: Metadata = {
  title: 'Calculators',
  description: 'Plan smarter with BMI, BMR/TDEE, and macro calculators built for daily nutrition decisions.',
};

export default function CalculatorsPage() {
  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Nutrition Calculators"
        description="Use these tools together to personalize your intake. Start with BMI for context, estimate your energy needs, then set macro targets."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <BmiCalculator />
        <BmrCalculator />
      </div>
      <MacroCalculator />
    </Container>
  );
}
