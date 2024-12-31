import { JSX } from "react";

interface TableProps {
  headers: string[];
  datas: any[];
  actions?: {
    label: string;
    icon: JSX.Element;
    color?: string;
    onclick: (dataId: string) => void;
  }[];
}

function Table({ headers, datas, actions }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="shadow-md border-collapse bg-bgLightGray min-w-[600px] w-full">
        <thead className="bg-primary">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas?.length > 0 ? (
            datas.map((data) => (
              <tr
                key={data._id}
                className="text-center text-textPrimary border-b border-gray-300"
              >
                {Object.entries(data)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value]) => (
                    <td
                      key={`${data._id}-${key}`}
                      className="border-gray-300 p-3"
                    >
                      {value as string | number}
                    </td>
                  ))}
                {actions && (
                  <td key={"action"}>
                    {actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => action.onclick(data._id)}
                        className={`text-lg ${action?.color} rounded-full hover:bg-gray-200 mx-3 p-1 sm:p-3`}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="text-center h-20">
              <td colSpan={headers?.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
