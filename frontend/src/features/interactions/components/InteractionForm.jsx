import FormField from "./FormField";
import SavedEntriesList from "./SavedEntriesList";

const interactionOptions = ["Meeting", "Call", "Visit", "Other"];

const fieldClassName =
  "w-full rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

function InteractionForm({
  formData,
  onFieldChange,
  onSaveEntry,
  onEditEntry,
  onDeleteEntry,
  onResetForm,
  entries,
  editingEntryId,
  isSaving,
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-5 md:px-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-800">
            Log HCP Interaction
          </h1>
          {editingEntryId ? (
            <p className="mt-1 text-sm text-slate-500">Editing a saved interaction</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {editingEntryId ? (
            <button
              type="button"
              onClick={onResetForm}
              className="inline-flex items-center justify-center rounded-[12px] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              New Entry
            </button>
          ) : null}

          <button
            type="button"
            onClick={onSaveEntry}
            className="inline-flex items-center justify-center rounded-[12px] bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : editingEntryId ? "Update Entry" : "Save Entry"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">
        <div className="space-y-8">
          <section>
            <div className="mb-4">
              <h2 className="text-[15px] font-semibold text-slate-700">Interaction Details</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="HCP Name">
                <input
                  className={fieldClassName}
                  type="text"
                  value={formData.hcp_name}
                  onChange={(event) => onFieldChange("hcp_name", event.target.value)}
                  placeholder="Search or select HCP..."
                />
              </FormField>

              <FormField label="Interaction Type">
                <select
                  className={fieldClassName}
                  value={formData.interaction_type}
                  onChange={(event) => onFieldChange("interaction_type", event.target.value)}
                >
                  <option value="">Select type</option>
                  {interactionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </section>

          <section>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Date">
                <input
                  className={fieldClassName}
                  type="date"
                  value={formData.date}
                  onChange={(event) => onFieldChange("date", event.target.value)}
                />
              </FormField>

              <FormField label="Time">
                <input
                  className={fieldClassName}
                  type="time"
                  value={formData.time}
                  onChange={(event) => onFieldChange("time", event.target.value)}
                />
              </FormField>
            </div>
          </section>

          <section>
            <FormField label="Attendees">
              <input
                className={fieldClassName}
                type="text"
                value={formData.attendees}
                onChange={(event) => onFieldChange("attendees", event.target.value)}
                placeholder="Enter names or search..."
              />
            </FormField>
          </section>

          <section>
            <FormField label="Topics Discussed">
              <textarea
                className={`${fieldClassName} min-h-[112px] resize-none`}
                value={formData.topics}
                onChange={(event) => onFieldChange("topics", event.target.value)}
                placeholder="Enter key discussion points..."
              />
            </FormField>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition hover:text-sky-700"
            >
              <span className="text-base leading-none">Mic</span>
              Summarize from Voice Note (Requires Consent)
            </button>
          </section>

          <section className="pb-4">
            <div className="mb-2">
              <h2 className="text-[15px] font-semibold text-slate-700">
                Materials Shared / Samples Distributed
              </h2>
            </div>

            <div className="rounded-[12px] border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-sm font-semibold text-slate-700">Materials Shared</p>
              <textarea
                className={`${fieldClassName} mt-3 min-h-[120px] resize-none bg-white`}
                value={formData.materials}
                onChange={(event) => onFieldChange("materials", event.target.value)}
                placeholder="No materials added."
              />
            </div>
          </section>

          <SavedEntriesList
            entries={entries}
            editingEntryId={editingEntryId}
            onEditEntry={onEditEntry}
            onDeleteEntry={onDeleteEntry}
          />
        </div>
      </div>
    </div>
  );
}

export default InteractionForm;
