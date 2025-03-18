"use client";

import { useLoginMutation } from "@/features/auth/api/authApi";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { Card } from "@/widgets/card/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEvent, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const logInSchema = z.object({
	email: z
		.string()
		.nonempty("Email is required")
		.email("Invalid email address"),
	password: z
		.string()
		.nonempty("Password is required")
		.min(6, "The password must contain at least 6 characters")
		.max(20, "The password must not exceed 20 characters"),
});

type LogInSchema = z.infer<typeof logInSchema>;

export default function LogIn(): ReactElement {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { isDirty, errors },
	} = useForm<LogInSchema>({ resolver: zodResolver(logInSchema) });
	const [loginQuery, { isLoading, isError }] = useLoginMutation();

	const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
		const fieldName = e.target.name as keyof LogInSchema;
		try {
			const mask = { [fieldName]: true } as { [K in keyof LogInSchema]?: true };
			logInSchema.pick(mask).parse({ [fieldName]: e.target.value });
			setError(fieldName, { message: "" });
		} catch (err) {
			if (err instanceof z.ZodError) {
				setError(fieldName, { message: err.errors[0].message });
			}
		}
	};
	const onSubmit = async (data: LogInSchema) => {
		try {
			await loginQuery(data).unwrap();
			reset();
			router.push("/profile");
		} catch (err) {
			console.error("Login failed:", err);
		}
	};
	return (
		<Card
			className={cn(
				"align-center mt-[24px] flex w-full max-w-[378px] flex-col justify-center p-[24px]",
				"max-sm:bg-dark-900 max-sm:border-hidden",
			)}
		>
			<h1 className="h1-text text-center">Sign In</h1>
			<div className="mt-[13px] flex justify-center gap-15">
				{/* TODO OAuth */}
			</div>
			<div className="mt-6 flex w-full flex-col justify-center align-middle">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={"flex flex-col items-end"}
				>
					{isError && (
						<p className={"text-danger-500 text-center"}>
							The email or password are incorrect. Try again please
						</p>
					)}
					<Input
						className="w-full"
						label={"Email"}
						errorMessage={errors.email?.message}
						{...register("email", { onBlur: handleOnBlur })}
					/>
					<Input
						type="password"
						className="w-full"
						label={"Password"}
						errorMessage={errors.password?.message}
						{...register("password", {
							onBlur: handleOnBlur,
						})}
					/>
					{/* TODO добавить ссылку на Forgot Password */}
					<Link href="/" className={"text-light-900"}>
						Forgot Password
					</Link>
					<Button
						className="my-5 w-full"
						type="submit"
						disabled={
							!isDirty ||
							isLoading ||
							!!errors.email?.message ||
							!!errors.password?.message
						}
					>
						Sign In
					</Button>
				</form>
				<p className="regular-text-16 text-center">Don’t have an account? </p>
				<Link
					href="/sign-up"
					className={
						"text-primary-500 font-semibold text-accent-500 mx-auto w-20 p-2"
					}
				>
					Sign Up
				</Link>
			</div>
		</Card>
	);
}
