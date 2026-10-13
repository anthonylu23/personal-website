import StackIcon from "../components/StackIcon";
import { stack } from "../data/stack";

const Stack = () => (
  <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
    <h1 className="sr-only">Stack</h1>
    {stack.map((group, i) => (
      <section
        key={group.label}
        className="animate-fade-up-1"
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:gap-24">
          <h2 className="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            {group.label}
          </h2>
          <ul className="w-full gap-x-10 text-base leading-relaxed text-textSecondary sm:columns-2">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="group flex break-inside-avoid items-center gap-3 py-1"
              >
                <StackIcon
                  icon={item.icon}
                  className="h-4 w-4 shrink-0 text-textSecondary/60 transition-colors group-hover:text-accent"
                />
                <span className="transition-colors group-hover:text-textPrimary">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ))}
  </main>
);

export default Stack;
