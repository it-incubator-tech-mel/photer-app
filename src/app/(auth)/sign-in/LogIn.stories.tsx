import StoreWrapper from "@/store/StoreWrapper";
import type { Meta, StoryObj } from "@storybook/react";
import AuthLayout from "../layout";
import LogIn from "./page";

const meta = {
	title: "Pages",
	component: LogIn,
	decorators: [
		(Story) => (
			<body className={`bg-dark-900 regular-text-16 text-light-100`}>
				<StoreWrapper>
					<AuthLayout>
						<Story />
					</AuthLayout>
				</StoreWrapper>
			</body>
		),
	],
} as Meta<typeof LogIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {};
