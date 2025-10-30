import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BmiCalculator, BmrCalculator, MacroCalculator } from '@/components/calculators';

describe('BmiCalculator', () => {
  it('calculates BMI with metric units', () => {
    render(<BmiCalculator />);

    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '72' } });
    fireEvent.change(screen.getByLabelText('Height (cm)'), { target: { value: '178' } });

    fireEvent.click(screen.getByRole('button', { name: /calculate bmi/i }));

    expect(screen.getByText(/BMI:/i)).toHaveTextContent('BMI: 22.7');
    expect(screen.getByText(/Category:/i)).toHaveTextContent('Healthy weight');
  });
});

describe('BmrCalculator', () => {
  it('computes BMR and TDEE', () => {
    render(<BmrCalculator />);

    fireEvent.change(screen.getByLabelText('Age (years)'), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Height (cm)'), { target: { value: '175' } });
    fireEvent.change(screen.getByLabelText('Activity level'), { target: { value: '1.55' } });

    fireEvent.click(screen.getByRole('button', { name: /calculate energy needs/i }));

    expect(screen.getByText(/BMR/i).nextSibling).toHaveTextContent('kcal/day');
    expect(screen.getByText(/TDEE/i).nextSibling).toHaveTextContent('kcal/day');
  });
});

describe('MacroCalculator', () => {
  it('requires percentages to equal 100', () => {
    render(<MacroCalculator />);

    fireEvent.change(screen.getByLabelText('Protein %'), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText('Carbs %'), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText('Fat %'), { target: { value: '30' } });

    fireEvent.click(screen.getByRole('button', { name: /calculate macros/i }));

    expect(screen.getByText(/must add up to 100%/i)).toBeInTheDocument();
  });

  it('returns macro grams when total equals 100', () => {
    render(<MacroCalculator />);

    fireEvent.change(screen.getByLabelText('Daily calories (TDEE)'), { target: { value: '2400' } });
    fireEvent.change(screen.getByLabelText('Protein %'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Carbs %'), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText('Fat %'), { target: { value: '25' } });

    fireEvent.click(screen.getByRole('button', { name: /calculate macros/i }));

    expect(screen.getByText(/Protein/i).nextSibling).toHaveTextContent('g');
    expect(screen.getByText(/Carbs/i).nextSibling).toHaveTextContent('g');
    expect(screen.getByText(/Fat/i).nextSibling).toHaveTextContent('g');
  });
});
