export default function(props) {
  const {
    location: { pathname }
  } = props;

  if (pathname === "/" || pathname === "/admin") {
    return "curtncall";
  }

  if (pathname.includes("/cc/") || pathname.includes("/admin/")) {
    return pathname.split("/")[2];
  }

  return null;
}
