import React from 'react';

const ProjectHistoryView = ({ data }) => {
  if (!data || data.length === 0) return null;

  const formatKey = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="p-4 border border-slate-200 rounded-md shadow-sm bg-white mb-4">
      <h3 className="text-lg font-semibold text-purple-600 border-b pb-2 mb-4">Project History</h3>
      <div className="space-y-4">
        {data.map((project, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-md border border-slate-200">
            {Object.entries(project).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{formatKey(key)}</span>
                <span className="text-sm font-semibold text-slate-800">{value?.toString() || '-'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectHistoryView;