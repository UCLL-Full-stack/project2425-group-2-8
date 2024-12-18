import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

const WeightLosePlan: React.FC = () => {
  const { t } = useTranslation();
  const [isPlanVisible, setIsPlanVisible] = useState(false);

  const togglePlan = () => {
    setIsPlanVisible(!isPlanVisible);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <button onClick={togglePlan} className="btn btn-primary">
        {isPlanVisible ? t("stats.closeplan") : t("stats.loseweightbutton")}
      </button>

      {isPlanVisible && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">{t("stats.weightloss.title")}</h2>

          <section className="mb-4">
            <h3 className="font-semibold">{t("stats.weightloss.calories_guidelines")}</h3>
            <p className="mb-2">
              <strong>{t("stats.weightloss.daily_calories")}</strong>
            </p>
            <p className="mb-2">
              <strong>{t("stats.weightloss.macronutrients_split")}</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>{t("stats.weightloss.protein")}</li>
                <li>{t("stats.weightloss.carbs")}</li>
                <li>{t("stats.weightloss.fats")}</li>
              </ul>
            </p>
            <p>
              <strong>{t("stats.weightloss.tip")}</strong>
            </p>
          </section>

          <section className="mb-4">
            <h3 className="font-semibold">{t("stats.weightloss.meal_recommendations")}</h3>
            <ul className="list-disc pl-5">
              <li>{t("stats.weightloss.breakfast")}</li>
              <li>{t("stats.weightloss.lunch")}</li>
              <li>{t("stats.weightloss.dinner")}</li>
              <li>{t("stats.weightloss.snacks")}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold">{t("stats.weightloss.workout_advice")}</h3>
            <ul className="list-disc pl-5">
              <li>{t("stats.weightloss.hiit_training")}</li>
              <li>{t("stats.weightloss.cardio")}</li>
              <li>{t("stats.weightloss.strength_training")}</li>
              <li>{t("stats.weightloss.daily_steps")}</li>
              <li>{t("stats.weightloss.recovery")}</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default WeightLosePlan;
