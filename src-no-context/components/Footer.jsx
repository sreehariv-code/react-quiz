import p from "prop-types";
export default function Footer({ children }) {
  return <footer>{children}</footer>;
}

Footer.propTypes = {
  children: p.any,
};
