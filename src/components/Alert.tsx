import { ReactNode } from 'react';

interface AlertProps {
	children: ReactNode;
	color?: 'primary' | 'danger' | 'warning';
	onDismiss: () => void;
}

const Alert = ({ children, color = 'danger', onDismiss }: AlertProps) => {
	return (
		<div
			className={`alert alert-${color} alert-dismissible fade show`}
			role="alert"
		>
			{children}
			<button
				onClick={onDismiss}
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			></button>
		</div>
	);
};

export default Alert;
