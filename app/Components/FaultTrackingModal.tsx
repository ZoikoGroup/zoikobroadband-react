"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface FaultTrackingModalProps {
    open: boolean;
    onClose: () => void;
}

interface Fault {
    id: string;
    reference_number: string;
    issue_type: string;
    status: string;
    status_display: string;
    priority: string;
    created_at: string;
}

interface TimelineItem {
    status: string;
    note: string;
    created_at: string;
}

interface FaultDetail extends Fault {
    problem_description: string;
    timeline: TimelineItem[];
}

export default function FaultTrackingModal({
    open,
    onClose,
}: FaultTrackingModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [faults, setFaults] = useState<Fault[]>([]);

    const [selectedFault, setSelectedFault] =
        useState<FaultDetail | null>(null);

    const [view, setView] = useState<"list" | "detail">("list");

    useEffect(() => {
        if (open) {
            fetchMyFaults();
            setView("list");
            setSelectedFault(null);
            setError("");
        }
    }, [open]);

    const fetchMyFaults = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/api/faults/my-faults/",
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to fetch faults.");
            }

            setFaults(data.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load your fault reports.");
        } finally {
            setLoading(false);
        }
    };

    const fetchFaultDetails = async (id: string) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://127.0.0.1:8000/api/faults/${id}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to fetch fault.");
            }

            setSelectedFault(data.data);

            setView("detail");
        } catch (err) {
            console.error(err);
            setError("Unable to load fault details.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusClasses = (status: string) => {
        switch (status) {
            case "submitted":
                return "bg-blue-100 text-blue-700";

            case "assigned":
                return "bg-purple-100 text-purple-700";

            case "investigating":
                return "bg-yellow-100 text-yellow-700";

            case "resolved":
                return "bg-green-100 text-green-700";

            case "closed":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-gray-200 text-gray-700";
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-[#10446C] dark:text-white">
                            Track My Faults
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            View the latest progress of your reported faults.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <IoClose className="text-2xl" />
                    </button>

                </div>

                {/* Content */}

                <div className="p-6 min-h-[500px] max-h-[70vh] overflow-y-auto">
                    {/* Loading */}
                    {loading && (
                        <div className="flex h-[400px] items-center justify-center">
                            <div className="text-center">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#10446C] border-t-transparent mx-auto"></div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    Loading your fault reports...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="flex h-[400px] items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-red-600">
                                    Something went wrong
                                </h3>

                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    {error}
                                </p>

                                <button
                                    onClick={fetchMyFaults}
                                    className="mt-6 rounded-lg bg-[#10446C] px-5 py-2 text-white hover:bg-[#0D3655]"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* LIST VIEW */}
                    {!loading && !error && view === "list" && (
                        <>
                            {faults.length === 0 ? (
                                <div className="flex h-[400px] flex-col items-center justify-center">

                                    <div className="text-6xl">📋</div>

                                    <h3 className="mt-4 text-xl font-semibold dark:text-white">
                                        No Fault Reports
                                    </h3>

                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        You haven't reported any faults yet.
                                    </p>

                                </div>
                            ) : (
                                <div className="space-y-5">

                                    {faults.map((fault) => (

                                        <div
                                            key={fault.id}
                                            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition hover:shadow-md"
                                        >

                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                                {/* Left */}

                                                <div>

                                                    <h3 className="text-xl font-semibold dark:text-white">
                                                        {fault.issue_type}
                                                    </h3>

                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Reference:
                                                        <span className="ml-2 font-medium">
                                                            {fault.reference_number}
                                                        </span>
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Reported on{" "}
                                                        {new Date(fault.created_at).toLocaleDateString()}
                                                    </p>

                                                </div>

                                                {/* Right */}

                                                <div className="flex flex-col items-start md:items-end">

                                                    <span
                                                        className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(
                                                            fault.status
                                                        )}`}
                                                    >
                                                        {fault.status_display}
                                                    </span>

                                                    <button
                                                        onClick={() => fetchFaultDetails(fault.id)}
                                                        className="mt-4 rounded-lg border border-[#10446C] px-5 py-2 text-sm font-medium text-[#10446C] transition hover:bg-[#10446C] hover:text-white"
                                                    >
                                                        View Details
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            )}
                        </>
                    )}

                    {/* DETAIL VIEW */}

                    {!loading && !error && view === "detail" && selectedFault && (
                        <div>

                            {/* Back Button */}

                            <button
                                onClick={() => {
                                    setView("list");
                                    setSelectedFault(null);
                                }}
                                className="mb-6 flex items-center text-[#10446C] hover:underline font-medium"
                            >
                                ← Back to My Faults
                            </button>

                            {/* Fault Info */}

                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">

                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                                    <div>

                                        <h2 className="text-2xl font-bold dark:text-white">
                                            {selectedFault.issue_type}
                                        </h2>

                                        <p className="mt-3 text-gray-500">
                                            <span className="font-semibold">
                                                Reference:
                                            </span>{" "}
                                            {selectedFault.reference_number}
                                        </p>

                                        <p className="mt-2 text-gray-500">
                                            <span className="font-semibold">
                                                Reported:
                                            </span>{" "}
                                            {new Date(selectedFault.created_at).toLocaleString()}
                                        </p>

                                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                                            {selectedFault.problem_description}
                                        </p>

                                    </div>

                                    <div className="space-y-3">

                                        {/* Status */}

                                        <div>

                                            <p className="text-sm text-gray-500 mb-1">
                                                Status
                                            </p>

                                            <span
                                                className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(
                                                    selectedFault.status
                                                )}`}
                                            >
                                                {selectedFault.status_display}
                                            </span>

                                        </div>

                                        {/* Priority */}

                                        <div>

                                            <p className="text-sm text-gray-500 mb-1">
                                                Priority
                                            </p>

                                            <span
                                                className={`rounded-full px-4 py-2 text-sm font-medium ${selectedFault.priority === "urgent"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {selectedFault.priority}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Timeline */}

                            <div className="mt-8">

                                <h3 className="text-xl font-semibold dark:text-white mb-6">
                                    Status Timeline
                                </h3>

                                <div className="relative border-l-2 border-[#10446C] ml-3">

                                    {selectedFault.timeline.map((item, index) => (

                                        <div
                                            key={index}
                                            className="relative mb-8 pl-8"
                                        >

                                            {/* Dot */}

                                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#10446C]" />

                                            {/* Card */}

                                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">

                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                                    <div>

                                                        <h4 className="font-semibold dark:text-white">
                                                            {item.status.replace("_", " ")}
                                                        </h4>

                                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                                            {item.note}
                                                        </p>

                                                    </div>

                                                    <div className="text-sm text-gray-500">

                                                        {new Date(item.created_at).toLocaleString()}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}