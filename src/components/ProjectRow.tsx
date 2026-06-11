import { ExternalLink, FileText, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project, ProjectLinkType } from "../data/content";

const LINK_META: Record<ProjectLinkType, { icon: LucideIcon; label: string }> = {
  github: { icon: Github, label: "GitHub" },
  demo: { icon: ExternalLink, label: "Demo" },
  paper: { icon: FileText, label: "Paper" },
};

const ProjectRow = ({ project }: { project: Project }) => {
  const links = project.links ?? [];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-medium text-textPrimary/90">{project.title}</span>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => {
              const meta = LINK_META[link.type];
              const Icon = meta.icon;
              return (
                <a
                  key={`${link.type}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group inline-flex items-center gap-1.5 rounded-full border border-border/40 px-2.5 py-1 text-xs text-textSecondary transition hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
                  {link.label ?? meta.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <p className="text-sm leading-relaxed text-textSecondary">
        {project.description}
      </p>
    </>
  );
};

export default ProjectRow;
