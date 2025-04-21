import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

function PackageCards({
  isEditMode,
  editedPackages,
  handlePackageChange,
  handlePackageFeatureChange,
  handlePackageExcludedChange,
  handleAddFeature,
  handleAddExcluded,
  setEditedPackages,
}) {
  const CheckIcon = ({ inactive = false }) => (
    <svg
      className={`w-5 h-5 ${inactive ? "text-gray-400" : "text-gray-700"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );

  return (
    <>
      {editedPackages.map((pkg, index) => (
        <div
          key={index}
          className="p-6 rounded-xl shadow-sm border border-gray-100 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            {isEditMode ? (
              <input
                type="text"
                value={pkg.name}
                onChange={(e) =>
                  handlePackageChange(index, "name", e.target.value)
                }
                className="text-xl font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none flex-grow min-w-[150px]"
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-800">
                {pkg.name}
              </h3>
            )}
            {isEditMode ? (
              <input
                type="text"
                value={pkg.tag}
                onChange={(e) =>
                  handlePackageChange(index, "tag", e.target.value)
                }
                className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full text-center max-w-[150px]"
              />
            ) : (
              pkg.tag && (
                <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full text-center">
                  {pkg.tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-end mb-6">
            <span className="text-2xl font-medium text-gray-700">₹</span>
            {isEditMode ? (
              <input
                type="number"
                value={pkg.price}
                onChange={(e) =>
                  handlePackageChange(index, "price", parseInt(e.target.value))
                }
                className="text-5xl font-extrabold text-gray-800 bg-transparent border-b border-gray-300 w-32 focus:outline-none"
              />
            ) : (
              <span className="text-5xl font-extrabold text-gray-800">
                {pkg.price}
              </span>
            )}
            <span className="ml-1 text-lg text-gray-500">/session</span>
          </div>

          <ul className="space-y-3 mb-6">
            {pkg.features.map((item, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <CheckIcon />
                {isEditMode ? (
                  <div className="ml-2 flex items-center gap-2 w-full max-w-full overflow-hidden">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handlePackageFeatureChange(index, idx, e.target.value)
                      }
                      className="bg-transparent border-b border-gray-300 flex-grow min-w-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      title="Delete Feature"
                      onClick={() => {
                        const updatedPackages = [...editedPackages];
                        updatedPackages[index].features.splice(idx, 1);
                        setEditedPackages(updatedPackages);
                      }}
                      className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out p-1 rounded hover:bg-red-100"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="ml-2">{item}</span>
                )}
              </li>
            ))}

            {isEditMode && (
              <li>
                <button
                  onClick={() => handleAddFeature(index)}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FaPlus className="mr-1" /> Add Feature
                </button>
              </li>
            )}

            {pkg.excluded.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center opacity-50 line-through text-gray-500"
              >
                <CheckIcon inactive />
                {isEditMode ? (
                  <div className="ml-2 flex items-center gap-2 w-full max-w-full overflow-hidden">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handlePackageExcludedChange(index, idx, e.target.value)
                      }
                      className="bg-transparent border-b border-gray-300 flex-grow min-w-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      title="Delete Excluded Item"
                      onClick={() => {
                        const updatedPackages = [...editedPackages];
                        updatedPackages[index].excluded.splice(idx, 1);
                        setEditedPackages(updatedPackages);
                      }}
                      className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out p-1 rounded hover:bg-red-100"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="ml-2">{item}</span>
                )}
              </li>
            ))}

            {isEditMode && (
              <li>
                <button
                  onClick={() => handleAddExcluded(index)}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FaPlus className="mr-1" /> Add Excluded Item
                </button>
              </li>
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

export default PackageCards;
