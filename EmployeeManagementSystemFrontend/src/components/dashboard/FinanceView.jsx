import React from 'react';

const FinanceView = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const formatKey = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const renderData = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={key} className="col-span-full mt-2">
            <h4 className="text-sm font-semibold text-slate-700 mb-2 border-b border-slate-100 pb-1">{formatKey(key)}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {renderData(value)}
            </div>
          </div>
        );
      }
      return (
        <div key={key} className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{formatKey(key)}</span>
          <span className="text-sm font-semibold text-slate-800">{value?.toString() || '-'}</span>
        </div>
      );
    });
  };

  return (
    <div className="p-4 border border-slate-200 rounded-md shadow-sm bg-white mb-4">
      <h3 className="text-lg font-semibold text-purple-600 border-b pb-2 mb-4">Finance Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderData(data)}
      </div>
    </div>
  );
};

export default FinanceView;