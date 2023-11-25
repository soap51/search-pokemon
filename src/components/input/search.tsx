import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
const DEBOUNCE_TIME = 600;

export const SearchInput = () => {
  const router = useRouter();
  const { search } = router.query;
  const [value, setValue] = useState(search ?? "");
  const [debounced] = useDebounce(value, DEBOUNCE_TIME);

  useEffect(() => {
    router.push({
      pathname: "/",
      query: { search: debounced },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    if (search !== debounced) {
      setValue(router.query.search ?? "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <input
      className="rounded-lg border border-solid p-2"
      value={value as string}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
