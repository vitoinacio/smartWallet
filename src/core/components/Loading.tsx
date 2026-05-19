import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
	message?: string;
	size?: number;
	className?: string;
}

export default function Loading({
	message = "Carregando...",
	size = 60,
	className = "",
}: LoadingProps) {
	return (
		<div className={cn("flex flex-col justify-center items-center", className)}>
			<div className="flex justify-center items-center mb-4">
				<Loader2
					size={size}
					className="animate-spin text-blue-800 dark:text-primary"
					data-testid="loading-spinner"
				/>
			</div>
			<p className="text-blue-800 dark:text-primary text-sm font-bold">{message}</p>
		</div>
	);
}