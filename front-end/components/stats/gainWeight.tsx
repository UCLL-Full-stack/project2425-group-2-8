import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

const WeightGainPlan: React.FC = () => {

  const { t } = useTranslation();

  const [isPlanVisible, setIsPlanVisible] = useState(false);

  const togglePlan = () => {
    setIsPlanVisible(!isPlanVisible);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <button 
        onClick={togglePlan}
        className="btn btn-primary"
      >
        {isPlanVisible ? (t("stats.closeplan")) : (t("stats.gainweightbutton"))}
      </button>

      {isPlanVisible && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">{t("stats.weightgain.title")}</h2>
          
          <section className="mb-4">
            <h3 className="font-semibold">{t("stats.weightgain.calories_guidelines")}</h3>
            <p className="mb-2">
              <strong>{t("stats.weightgain.daily_calories")}</strong>
            </p>
            <p className="mb-2">
              <strong>{t("stats.weightgain.macronutrients_split")}</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>{t("stats.weightgain.protein")}</li>
                <li>{t("stats.weightgain.carbs")}</li>
                <li>{t("stats.weightgain.fats")}</li>
              </ul>
            </p>
            <p>
              <strong>{t("stats.weightgain.tip")}</strong>
            </p>
          </section>

          <section className="mb-4">
            <h3 className="font-semibold">{t("stats.weightgain.meal_recommendations")}</h3>
            <ul className="list-disc pl-5">
              <li>{t("stats.weightgain.breakfast")}</li>
              <li>{t("stats.weightgain.mid_morning_snack")}</li>
              <li>{t("stats.weightgain.lunch")}</li>
              <li>{t("stats.weightgain.afternoon_snack")}</li>
              <li>{t("stats.weightgain.dinner")}</li>
              <li>{t("stats.weightgain.evening_snack")}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold">{t("stats.weightgain.workout_advice")}</h3>
            <ul className="list-disc pl-5">
              <li>{t("stats.weightgain.compound_exercises")}</li>
              <li>{t("stats.weightgain.progressive_overload")}</li>
              <li>{t("stats.weightgain.reps_sets")}</li>
              <li>{t("stats.weightgain.rest_time")}</li>
              <li>{t("stats.weightgain.sessions_per_week")}</li>
              <li>{t("stats.weightgain.limit_cardio")}</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default WeightGainPlan;
