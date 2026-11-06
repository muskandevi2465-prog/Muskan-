import React from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF5EE] rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-[#E8D9C8] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 text-[#73574E] hover:text-[#3B2118] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8F5567] shadow-xs">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl font-medium text-[#3B2118]">
              Atelier Size & Measurement Guide
            </h3>
            <p className="text-xs text-[#73574E]">
              Standard Indian Couture Sizing (All measurements in inches)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E8D9C8] bg-white shadow-2xs">
          <table className="w-full text-xs text-left text-[#3B2118]">
            <thead className="bg-[#FAF5EE] text-[#5D4238] uppercase font-bold tracking-wider border-b border-[#E8D9C8]">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Bust</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Hip</th>
                <th className="py-3 px-4">Kurti Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE]">
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">XS (34)</td>
                <td className="py-3 px-4">34"</td>
                <td className="py-3 px-4">28"</td>
                <td className="py-3 px-4">38"</td>
                <td className="py-3 px-4">44" - 48"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">S (36)</td>
                <td className="py-3 px-4">36"</td>
                <td className="py-3 px-4">30"</td>
                <td className="py-3 px-4">40"</td>
                <td className="py-3 px-4">44" - 48"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">M (38)</td>
                <td className="py-3 px-4">38"</td>
                <td className="py-3 px-4">32"</td>
                <td className="py-3 px-4">42"</td>
                <td className="py-3 px-4">45" - 49"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">L (40)</td>
                <td className="py-3 px-4">40"</td>
                <td className="py-3 px-4">34"</td>
                <td className="py-3 px-4">44"</td>
                <td className="py-3 px-4">45" - 49"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">XL (42)</td>
                <td className="py-3 px-4">42"</td>
                <td className="py-3 px-4">36"</td>
                <td className="py-3 px-4">46"</td>
                <td className="py-3 px-4">46" - 50"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#8F5567]">XXL (44)</td>
                <td className="py-3 px-4">44"</td>
                <td className="py-3 px-4">38"</td>
                <td className="py-3 px-4">48"</td>
                <td className="py-3 px-4">46" - 50"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-white border border-[#E8D9C8] text-xs text-[#73574E] space-y-2">
          <p className="font-semibold text-[#3B2118]">Need Custom Fitting?</p>
          <p>
            Muskan's Stitching offers complimentary custom alterations on all semi-stitched and ready-to-wear ensembles. Connect directly with our master master-cutter on WhatsApp: +91 98765 43210.
          </p>
        </div>
      </div>
    </div>
  );
};
