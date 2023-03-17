interface ButtonProps {
	children: string;
	color?: 'primary' | 'secondary' | 'danger';
	onClick: () => void;
}

const Button = ({ color = 'primary', children, onClick }: ButtonProps) => {
	return (
		<button type="button" className={`btn btn-${color}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
