/** @format */

type Props = {};

const FooterComp = (props: Props) => {
  return (
    <footer className="text-center py-2 z-10">
      <h2 className="text-center">
        Copyright © 2024 - {new Date().getFullYear()} Ledy Isabella Teurupun.
      </h2>
    </footer>
  );
};

export default FooterComp;
