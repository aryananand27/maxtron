import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomerCommonTableProps {
  columns: string[];
  rows: string[][];
  statusStyles?: { [key: string]: { backgroundColor: string; color: string } };
}

interface TableProps {
  data: CustomerCommonTableProps;
}

const TasksTable: React.FC<TableProps> = ({ data }) => {
  const colCount = data.columns.length + 1;

  const isStatusColumn =
    data.columns.length > 0 &&
    data.columns[data.columns.length - 1].toLowerCase() === 'status';

 const navigate=useNavigate();
  return (
    <div className="w-full mt-2">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
 
        <div
          className="grid bg-gradient-to-r from-[#17428E]/10 to-[#0f346d]/10 border-b-4 border-[#17428E]/30"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {data.columns.map((col, idx) => (
            <div
              key={idx}
              className="px-6 py-5 text-left text-xs font-bold text-[#17428E] uppercase tracking-widest"
            >
              {col}
            </div>
          ))}
          <div className="px-6 py-5 text-center text-xs font-bold text-[#17428E] uppercase tracking-widest">
            Actions
          </div>
        </div>

        {data.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`
              grid border-b-2 border-gray-300 transition-all duration-200
              ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              hover:bg-indigo-50 hover:shadow-lg cursor-pointer
            `}
            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
          
            {row.map((cell, cellIndex) => {
              const isLastCell = cellIndex === data.columns.length - 1;
              const isStatusCell = isStatusColumn && isLastCell;

              if (isStatusCell) {
                const statusKey = Object.keys(data.statusStyles || {}).find(
                  (key) => key.toUpperCase() === cell.toUpperCase()
                );

                const style = statusKey
                  ? data.statusStyles![statusKey]
                  : { backgroundColor: '#6B7280', color: '#FFFFFF' };

                return (
                  <div key={cellIndex} className="px-6 py-5 flex items-center justify-start">
                    <span
                      className="inline-block px-4 py-2 text-sm font-poppins font-medium rounded-md text-center shadow-sm transition-colors"
                      style={{
                        backgroundColor: style.backgroundColor,
                        color: style.color,
                        minWidth: '120px',
                        width: '135px',
                      }}
                    >
                      {cell}
                    </span>
                  </div>
                );
              }

              return (
                <div key={cellIndex} className="px-6 py-5 text-sm font-medium text-gray-900 flex items-center">
                  <span className="truncate max-w-full">{cell}</span>
                </div>
              );
            })}
            <div
              className="px-6 py-5 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="bg-[#17428E] hover:bg-[#123670] text-sm font-poppins font-medium text-[#F8FAFC] px-8 py-2 rounded-md transition-colors duration-200 focus:outline-none w-[135px]" onClick={()=>navigate(`/update-task/${row[0]}`)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTable;