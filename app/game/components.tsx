import "react";
import type {InfoCard} from "./types"
import Image from "next/image"

type InfoCardWithTitle = InfoCard & { title?: string };

export function InfoCardComp(props?: InfoCardWithTitle){
        if(!props) return null;
        const { Description, KeyFeatures, title } = props;
        return (
                <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                    <div className="px-5 py-4">
                        {title ? (
                          <h3 className="text-base font-semibold text-blue-900">{title}</h3>
                        ) : (
                          <h4 className="text-sm font-semibold text-blue-800">About this syndrome</h4>
                        )}
                        <p className="mt-2 text-sm text-slate-700">{Description}</p>

                        <ul className="mt-3 space-y-2">
                            {KeyFeatures.map((k, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{i+1}</span>
                                    <span>{k}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        )
}

export function LowFotter(){
        return <div> 
                <p className="mt-6 text-center text-xs text-blue-300"> Done with love By al-Khattab Al-hinaai </p>
        </div>
}