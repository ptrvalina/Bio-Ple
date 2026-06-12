"use client";

import {
  AlertTriangle,
  BarChart2,
  ClipboardList,
  CloudSun,
  FileSpreadsheet,
  GitCompare,
  Map,
  Sun,
} from "lucide-react";
import { WidgetCard } from "@/components/ui/WidgetCard";
import { FieldMapWidget } from "@/components/widgets/FieldMapWidget";
import { FieldAnalysisWidget } from "@/components/widgets/FieldAnalysisWidget";
import { WeatherNowWidget } from "@/components/widgets/WeatherNowWidget";
import { AlertsWidget } from "@/components/widgets/AlertsWidget";
import { OperationsLogWidget } from "@/components/widgets/OperationsLogWidget";
import { TechMapWidget } from "@/components/widgets/TechMapWidget";
import { PlanFactWidget } from "@/components/widgets/PlanFactWidget";
import { WeatherForecastWidget } from "@/components/widgets/WeatherForecastWidget";
import { useDataStore } from "@/store/dataStore";

/** Фиксированная профессиональная сетка главного дашборда */
export function DashboardLayout() {
  const alerts = useDataStore((s) => s.alerts);
  const deviations = useDataStore((s) => s.deviations);

  return (
    <div className="grid auto-rows-min gap-4 lg:grid-cols-12">
      {/* Ряд 1: карта + анализ */}
      <div className="lg:col-span-7 lg:row-span-2 lg:min-h-[420px]">
        <WidgetCard title="Карта полей" icon={Map} badge="NDVI" badgeVariant="success" noPadding>
          <div className="h-full p-4 lg:min-h-[380px]">
            <FieldMapWidget />
          </div>
        </WidgetCard>
      </div>

      <div className="lg:col-span-5 lg:row-span-2 lg:min-h-[420px]">
        <WidgetCard title="Анализ поля" icon={BarChart2} badge="Спутник">
          <FieldAnalysisWidget />
        </WidgetCard>
      </div>

      {/* Ряд 2: погода, алерты, техкарта */}
      <div className="lg:col-span-3">
        <WidgetCard title="Погода сейчас" icon={Sun} badge="Live" badgeVariant="success">
          <WeatherNowWidget />
        </WidgetCard>
      </div>

      <div className="lg:col-span-3">
        <WidgetCard
          title="Алерты"
          icon={AlertTriangle}
          badge={alerts.length > 0 ? String(alerts.length) : undefined}
          badgeVariant={alerts.length > 0 ? "danger" : "success"}
        >
          <AlertsWidget />
        </WidgetCard>
      </div>

      <div className="lg:col-span-6">
        <WidgetCard title="Технологическая карта" icon={FileSpreadsheet} badge="Активное поле">
          <TechMapWidget />
        </WidgetCard>
      </div>

      {/* Ряд 3: журнал + план/факт */}
      <div className="lg:col-span-7 lg:min-h-[300px]">
        <WidgetCard title="Журнал обработок" icon={ClipboardList} badge="7 записей">
          <OperationsLogWidget />
        </WidgetCard>
      </div>

      <div className="lg:col-span-5 lg:min-h-[300px]">
        <WidgetCard
          title="Расхождения план/факт"
          icon={GitCompare}
          badge={String(deviations.length)}
          badgeVariant="warning"
        >
          <PlanFactWidget />
        </WidgetCard>
      </div>

      {/* Ряд 4: прогноз */}
      <div className="lg:col-span-12">
        <WidgetCard title="Прогноз погоды" icon={CloudSun} badge="3 дня">
          <WeatherForecastWidget />
        </WidgetCard>
      </div>
    </div>
  );
}
