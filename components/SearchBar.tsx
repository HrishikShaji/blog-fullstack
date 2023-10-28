import { ExtendedPost } from "@/types/Types";
import { useEffect, useRef, useState } from "react";
import { SearchResult } from "./SearchResult";

interface SearchBarProps {
  setFinalResults: (values: any) => void;
  finalResults: ExtendedPost[];
  inputValue: string;
  setInputValue: (input: string) => void;
}

type RecentSearch = {
  query: string;
  slug: string;
  content?: any;
};
export const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  setFinalResults,
  finalResults,
  setInputValue,
}) => {
  const [suggestions, setSuggestions] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const fetchData = async (value: string) => {
    if (value !== "") {
      await fetch("/api/search")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((post: ExtendedPost) => {
            return post && post.slug && post.slug.toLowerCase().includes(value);
          });
          setResults(results);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== searchRef.current && e.target !== inputRef.current) {
        setSuggestions(false);
      }
    });
  }, []);

  useEffect(() => {
    const recentSearches = localStorage.getItem("recent-searches");
    if (recentSearches) {
      setRecentSearches(JSON.parse(recentSearches));
    }
  }, []);
  const handleChange = (value: string) => {
    setInputValue(value);
    fetchData(value);
  };

  const handleSearch = async (query: string) => {
    setSuggestions(false);

    if (inputValue !== "") {
      await fetch("/api/search")
        .then((response) => response.json())
        .then((json: ExtendedPost[]) => {
          const results = json.filter((post: ExtendedPost) => {
            return post && post.slug && post.slug.toLowerCase().includes(query);
          });
          setFinalResults(results);
        });
      const queryExists = recentSearches.filter((search) => {
        return search.query === query;
      });

      if (finalResults.length > 0 && queryExists.length === 0) {
        const post = finalResults[0];
        const content = post.content as any;
        const images = (content.blocks || []).filter(
          (block: any) => block.type == "image",
        );
        const image = images?.length > 0 ? images[0].data.file.url : null;
        const data: RecentSearch = {
          query: query,
          slug: finalResults[0].slug,
          content: image,
        };
        recentSearches.push(data);
        if (recentSearches.length > 10) {
          recentSearches.shift();
        }
        localStorage.setItem("recent-searches", JSON.stringify(recentSearches));
      }
    }
  };

  return (
    <div className="w-[50vw] relative">
      <div className="flex gap-2 relative">
        <input
          ref={inputRef}
          onClick={() => setSuggestions(true)}
          className="p-2 border-2 text-black w-full"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type to search..."
        />
        <button
          onClick={() => handleSearch(inputValue)}
          className="p-2  absolute font-semibold text-black right-0"
        >
          Search
        </button>
      </div>
      {suggestions && (
        <div
          ref={searchRef}
          className=" w-full max-h-[300px] overflow-y-scroll absolute z-10 bg-neutral-600 flex flex-col  "
        >
          {inputValue !== "" ? (
            results.map((post: ExtendedPost) => {
              return (
                <SearchResult
                  slug={post.slug}
                  content={post.content}
                  title={post.title}
                  key={post.id}
                />
              );
            })
          ) : (
            <div className="flex flex-col gap-2">
              <h1>Recent Searches</h1>
              <div>
                {recentSearches.map((post, i) => {
                  return (
                    <SearchResult
                      slug={post.slug}
                      content={post.content}
                      title={post.query}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
