export default function getIsAdminPage(props) {
  const {
    location: { pathname }
  } = props;

  if (pathname.includes("admin")) {
    return true;
  }
  return false;
}
