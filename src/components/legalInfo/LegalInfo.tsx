import Link from 'next/link';

type Props = {
  heading: string;
  text: string;
};

export const LegalInfo = ({ heading, text }: Props) => {
  return (
    <div className="mx-auto flex max-w-[1024px] flex-col">
      {/* TODO указать ссылку на страницу регистрации */}
      <Link href="/" className="mt-[24px]">
        {/* <IconSprite /> */} Back to Sign Up
      </Link>
      <h1 className="h1-text mx-auto mt-[24px]">{heading}</h1>
      <p className="px-[97px] text-center">{text}</p>
    </div>
  );
};
